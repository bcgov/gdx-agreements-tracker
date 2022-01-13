import { useRouter } from "next/router";

const CommentExample = () => {
  const router = useRouter();
  const { contractId, commentExampleId } = router.query;
  return (
    <div>
      Contract Details Comment {commentExampleId} for {contractId}
    </div>
  );
};

export default CommentExample;
