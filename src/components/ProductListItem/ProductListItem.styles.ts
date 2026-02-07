import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,

    // subtle “store” polish
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 1,
  },
  left: {
    flex: 1,
    paddingRight: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 4,
  },
  price: {
    fontSize: 13,
    fontWeight: "800",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    minWidth: 74,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 13,
  },
});
