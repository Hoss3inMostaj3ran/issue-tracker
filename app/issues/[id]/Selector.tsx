import prisma from "@/prisma/client";

const Selector = async () => {
  const users = await prisma.user.findMany({
    where: {},
  });
  return (
    <select
      title="Test"
      className="select select-accent select-bordered w-full max-w-xs"
    >
      <option disabled selected>
        Who shot first?
      </option>
      {users.map((u) => (
        <option key={u.id}>{u.name}</option>
      ))}
    </select>
  );
};

export default Selector;
