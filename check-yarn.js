if (
  !process.env.npm_config_user_agent ||
  !process.env.npm_config_user_agent.includes('yarn')
) {
  console.error(
    '\x1b[31m%s\x1b[0m',
    '─────────────────────────────────────────────────────────'
  );
  console.error(
    '\x1b[31m%s\x1b[0m',
    '  ERROR: Please use YARN instead of NPM for this project.'
  );
  console.error(
    '\x1b[31m%s\x1b[0m',
    '─────────────────────────────────────────────────────────'
  );
  process.exit(1);
}
