import PrimaryButton from '@/src/components/PrimaryButton';
import { STREAK_USER_STATE } from '@/src/constants/db_constants/streak';
import { theme } from '@/src/constants/theme';
import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PactCardExpanded({
  myState,
  partnerState,
  partnerName,
  isDayCompleted,
  myStateId,
  partnerStateId,
  onPressSubmit,
  onPressValidate,
  toggleButtons,
}) {
  const ableUpload = myStateId === STREAK_USER_STATE.NOT_SUBMITTED;
  const ableValidate = partnerStateId === STREAK_USER_STATE.SUBMITTED;

  return (
    <View style={styles.expandedContent}>
      <View style={styles.buttonRow}>
        <View style={styles.userActionContainer}>
          <View style={styles.userStateRow}>
            <View style={styles.avatarFallback}>
              <Text style={styles.avatarFallbackText}>Tú</Text>
            </View>
            <Text style={styles.userState}>{myState}</Text>
          </View>
          <PrimaryButton
            style={styles.actionButton}
            fontSize={16}
            onPress={onPressSubmit}
            label="Subir"
            disabled={!ableUpload}
          />
        </View>
        <View style={styles.userActionContainer}>
          <View style={[styles.userStateRow, styles.partnerStateRow]}>
            <Text style={styles.userState}>{partnerState}</Text>
            <View style={styles.avatarFallback}>
              <Text style={styles.avatarFallbackText}>
                {partnerName?.[0]?.toUpperCase()}
              </Text>
            </View>
          </View>
          <PrimaryButton
            style={styles.actionButton}
            fontSize={16}
            onPress={onPressValidate}
            label="Validar"
            disabled={!ableValidate}
          />
        </View>
      </View>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={styles.bottomRow}
          onPress={toggleButtons}
          activeOpacity={0.7}
        >
          <FontAwesome5
            name="chevron-up"
            size={16}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  expandedContent: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    paddingTop: 5,
  },
  userActionContainer: {
    flex: 1,
    maxWidth: "50%",
  },
  userStateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  partnerStateRow: {
    justifyContent: "flex-end",
  },
  avatarFallback: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarFallbackText: {
    color: theme.colors.textPrimary,
    fontSize: 11,
    fontWeight: theme.font.bold.toString(),
  },
  userState: {
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  actionButton: {
    height: 30,
    paddingVertical: 0,
  },
  toggleContainer: {
    marginTop: 6,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
