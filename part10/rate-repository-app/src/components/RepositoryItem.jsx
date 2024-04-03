import { View, Text } from "react-native";

export const RepositoryItem = ({ item }) => {
  return (
    <View>
      <Text>Full name: {item.fullName}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Language: {item.language}</Text>
      <Text>Stars: {item.stargazersCount}</Text>
      <Text>Forks {item.forksCount}</Text>
      <Text>Reviews: {item.reviewCount}</Text>
      <Text>Ratings: {item.ratingAverage}</Text>
    </View>
  );
};
