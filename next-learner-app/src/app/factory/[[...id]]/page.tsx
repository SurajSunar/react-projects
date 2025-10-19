import React from "react";

const OptionCountryParam = async ({
  params,
}: {
  params?: Promise<{ id: string[] }>;
}) => {
  const { id } = await params;

  console.log(id);


  return <div>OptionCountryParam by ids: {JSON.stringify(id)}</div>;
};

export default OptionCountryParam;
