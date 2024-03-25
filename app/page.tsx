import { Flex, Text, Button } from "@radix-ui/themes";
import Pagination from "./components/Pagination";

export default function Home() {
  return (
    <main>
      <Flex direction="column" gap="2">
        <Text>Hello from Radix Themes :)</Text>
        <Button>Let@apos;s go</Button>
        <br />
        <Pagination currentPage={2} itemsCount={11} pageSize={10} />
      </Flex>
    </main>
  );
}
