import { useRouter } from "next/router";

const ContractDetails = () => {
  const router = useRouter();
  const contractId = router.query.contractId;
  return <div>Contract Details {contractId}</div>;
};

export default ContractDetails;
