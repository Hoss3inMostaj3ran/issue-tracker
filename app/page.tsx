import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "This is a Simple Issue Tracker Website",
};

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <main>
      <div className="flex flex-col items-start mx-auto p-5 max-lg:p-7 gap-3">
        <h1 className="font-bold text-3xl py-5 mt-5 max-sm:text-[1.6rem] max-md:text-[1.9rem]">
          Welcome! This is My Issue Tracker Webiste.
        </h1>
        <h2 className="font-medium text-2xl max-sm:text-[1.3rem] max-md:text-[1.6rem]">
          This site created by Next.js and MySql Database
        </h2>

        <p className="font-medium">
          <strong>creator :</strong> Hossein Mostajeran
          <br />
          <strong>email :</strong> hoss3inmostaj3ran0916@outlook.com
        </p>
      </div>
    </main>
  );
}
