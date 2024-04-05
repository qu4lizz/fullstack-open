import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";

const useMe = () => {
  const { data, loading, error } = useQuery(GET_ME, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return { repositories: null, loading: true };
  }

  if (error) {
    return { repositories: null, loading: false, error };
  }

  return { me: data.me, loading: false };
};

export default useMe;
