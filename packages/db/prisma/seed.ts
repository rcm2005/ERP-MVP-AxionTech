import { db, close_db_client } from '../src/client.js';
import { seed_base } from '../src/seed/base.js';
import { seed_demo } from '../src/seed/demo.js';

function read_mode(): 'base' | 'demo' | 'all' {
  const mode_arg = process.argv.find((argument) => argument.startsWith('--mode='));
  const mode = mode_arg?.split('=')[1];

  if (mode === 'base' || mode === 'demo' || mode === 'all') {
    return mode;
  }

  return 'all';
}

async function main(): Promise<void> {
  const mode = read_mode();

  if (mode === 'base' || mode === 'all') {
    await seed_base(db);
  }

  if (mode === 'demo' || mode === 'all') {
    await seed_demo(db);
  }
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await close_db_client();
  });
