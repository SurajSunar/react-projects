const getData = () => {
  return {
    name: "server name",
    desc: "server desc",
  };
};

const ClientChecker = () => {
  const data = getData();

  return (
    <div className="flex flex-col gap-y-6">
      <h1>ServerChecker</h1>
      <div>
        <p>{data.name}</p>
        <p>{data.desc}</p>
      </div>
    </div>
  );
};

export default ClientChecker;
