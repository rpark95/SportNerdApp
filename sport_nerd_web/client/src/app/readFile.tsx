import { promises as fs } from 'fs';

export default async function Page() {
  const file = await fs.readFile(process.cwd() + '/resources/player_name_list.txt', 'utf8');
  const data = file.split('\n');
  console.log(data);
  return data;
  //...
}
