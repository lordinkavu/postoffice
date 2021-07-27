function Response({ response }) {
  return (
    <div className="my-8">
      <h2 className="font-bold my-4 text-lg">response</h2>

      <pre className="max-w-xl overflow-auto border ">
        {response && JSON.stringify(response.data, null, 2)}
      </pre>
    </div>
  );
}
export default Response;
