import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safe: { flex: 1 },
  topRow: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 22,
    fontWeight: "900",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "700",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  emptyBox: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 6,
  },
  emptySub: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },
  summary: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    marginTop: 8,
    marginBottom: 18,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 13,
    fontWeight: "800",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "900",
  },
  primaryBtn: {
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },
  primaryBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },

  // simple nav buttons row
  navRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  ghostBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
  },
  ghostBtnText: {
    fontSize: 13,
    fontWeight: "900",
  },
});
