import React from "react";

const CountryDetail = async ({
  params,
}: {
  params: Promise<{ id: string[] }>;
}) => {
  const { id } = await params;

  console.log(id);


  return <div>CountryDetail by ids: {JSON.stringify(id)}</div>;
};

export default CountryDetail;
