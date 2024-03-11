const NewIssue = () => {
  return (
    <form className="p-5">
      <h1 className="text-2xl my-5">What is your Issue? </h1>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter Title"
          className="input input-bordered  w-full max-w-3xl"
        />
        <textarea
          placeholder="Enter Description"
          className="textarea textarea-bordered textarea-md  w-full h-15 max-w-3xl"
        />
      </div>
      <button className="btn bg-gray-300 hover:bg-gray-400 mt-5" type="submit">
        Submit Issue
      </button>
    </form>
  );
};

export default NewIssue;
