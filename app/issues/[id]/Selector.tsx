const Selector = () => {
  return (
    <select
      title="Test"
      className="select select-accent select-bordered w-full max-w-xs"
    >
      <option disabled selected>
        Who shot first?
      </option>
      <option>Han Solo</option>
      <option>Greedo</option>
    </select>
  );
};

export default Selector;
