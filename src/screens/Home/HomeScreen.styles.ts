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
    gap: 12,
  },
  brand: {
    fontSize: 22,
    fontWeight: "900",
  },
  sub: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "700",
  },

  switchWrap: {
    alignItems: "flex-end",
    gap: 6,
  },
  switchLabel: {
    fontSize: 12,
    fontWeight: "800",
  },

  tabsWrap: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  tabsContent: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    minWidth: 105,
    alignItems: "center",
  },
  tabText: {
    fontSize: 13,
    fontWeight: "800",
  },

  listContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },

  sectionHeader: {
    marginTop: 18,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
  },

  bottomBar: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 12,
    borderWidth: 1,
    borderRadius: 18,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  bottomTitle: {
    fontSize: 13,
    fontWeight: "900",
  },
  bottomSub: {
    fontSize: 12,
    fontWeight: "800",
    marginTop: 2,
  },
  goCartBtn: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
  },
  goCartBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
  },
});
