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
  meta: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 6,
  },
  itemTotal: {
    fontSize: 13,
    fontWeight: "900",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  qtyBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyBtnText: {
    fontSize: 18,
    fontWeight: "900",
  },
  qty: {
    minWidth: 22,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "900",
  },
});
