#!/usr/bin/env bun

const DEFAULT_DEVICE_NAME = "iPhone 17 Pro";
const EXPO_GO_BUNDLE_ID = "host.exp.Exponent";
const EXPO_GO_WARMUP_MS = 3000;
const expoArgs = Bun.argv.slice(2);

function run(command, args, options = {}) {
  const result = Bun.spawnSync([command, ...args], {
    stdout: "pipe",
    stderr: "pipe",
    ...options,
  });

  return {
    exitCode: result.exitCode,
    stdout: new TextDecoder().decode(result.stdout).trim(),
    stderr: new TextDecoder().decode(result.stderr).trim(),
  };
}

function getBootedDeviceId() {
  const booted = run("xcrun", ["simctl", "list", "devices", "booted"]);
  const bootedMatch = booted.stdout.match(/\(([0-9A-F-]{36})\) \(Booted\)/);

  if (bootedMatch) {
    return bootedMatch[1];
  }

  const devices = run("xcrun", ["simctl", "list", "devices", "available"]);
  const preferredPattern = new RegExp(
    `${DEFAULT_DEVICE_NAME.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")} \\(([0-9A-F-]{36})\\) \\(Shutdown\\)`,
  );
  const preferredMatch = devices.stdout.match(preferredPattern);
  const fallbackMatch = devices.stdout.match(
    /\(([0-9A-F-]{36})\) \(Shutdown\)/,
  );
  const deviceId = preferredMatch?.[1] ?? fallbackMatch?.[1];

  if (!deviceId) {
    return null;
  }

  const boot = run("xcrun", ["simctl", "boot", deviceId]);
  if (boot.exitCode !== 0 && !boot.stderr.includes("current state: Booted")) {
    console.error(boot.stderr || "Failed to boot iOS simulator.");
    return null;
  }

  run("open", ["-a", "Simulator"]);
  run("xcrun", ["simctl", "bootstatus", deviceId, "-b"]);

  return deviceId;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function warmUpExpoGo() {
  const deviceId = getBootedDeviceId();
  if (!deviceId) {
    console.error("No available iOS simulator found.");
    process.exit(1);
  }

  run("open", ["-a", "Simulator"]);
  run("xcrun", ["simctl", "launch", deviceId, EXPO_GO_BUNDLE_ID]);
  await sleep(EXPO_GO_WARMUP_MS);
}

await warmUpExpoGo();

const expo = Bun.spawn(["bun", "x", "expo", "start", "--ios", ...expoArgs], {
  stdin: "inherit",
  stdout: "inherit",
  stderr: "inherit",
  env: process.env,
});

process.on("SIGINT", () => {
  expo.kill("SIGINT");
});

process.on("SIGTERM", () => {
  expo.kill("SIGTERM");
});

process.exit(await expo.exited);
