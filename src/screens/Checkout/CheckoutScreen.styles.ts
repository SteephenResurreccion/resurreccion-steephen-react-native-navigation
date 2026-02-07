import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safe: { flex: 1 },

  topRow: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
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
    paddingBottom: 120, // space for fixed footer
  },

  navRow: {
    marginBottom: 10,
  },
  ghostBtn: {
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
  },
  ghostBtnText: {
    fontSize: 13,
    fontWeight: "900",
  },

  rowCard: {
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
  name: {
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 4,
  },
  meta: {
    fontSize: 12,
    fontWeight: "700",
  },
  lineTotal: {
    fontSize: 13,
    fontWeight: "900",
  },

  // 🔒 Fixed bottom bar
  bottomBar: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 12,
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    gap: 10,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: "800",
  },
  totalValue: {
    fontSize: 15,
    fontWeight: "900",
  },

  primaryBtn: {
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  primaryBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
  },
});
