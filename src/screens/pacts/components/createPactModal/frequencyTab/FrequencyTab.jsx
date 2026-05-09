import { theme } from "@/src/constants/theme";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function FrequencyTab({
  pactData,
  setPactData,
  setFieldFilled,
}) {
  const [days, setDays] = useState(pactData.pact_days || []);
  const [hours, setHours] = useState(pactData.pact_hours || null);

  const DAYS_OF_WEEK = [
    { id: 0, label: "D" },
    { id: 1, label: "L" },
    { id: 2, label: "M" },
    { id: 3, label: "M" },
    { id: 4, label: "J" },
    { id: 5, label: "V" },
    { id: 6, label: "S" },
  ];

  const HOURS_RANGE = [1, 2, 3, 4, 5];

  const requiresHours =
    pactData.habit_name?.toLowerCase() === "tiempo en pantalla";

  const toggleDay = (dayId) => {
    setDays((prev) => {
      const newDays = prev.includes(dayId)
        ? prev.filter((d) => d !== dayId)
        : [...prev, dayId];
      return newDays;
    });
  };

  useEffect(() => {
    setPactData((prev) => ({ ...prev, pact_days: days, pact_hours: hours }));

    let isValid = days.length >= 3;
    if (requiresHours) isValid = isValid && hours !== null;

    setFieldFilled(isValid);
  }, [days, hours]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Establece la frecuencia</Text>
      <Text style={styles.description}>
        ¿Qué días quieres realizar esta actividad con tu compi?
      </Text>

      <View style={styles.daysContainer}>
        {DAYS_OF_WEEK.map((day) => {
          const isSelected = days.includes(day.id);
          return (
            <TouchableOpacity
              key={day.id}
              style={[styles.dayCircle, isSelected && styles.dayCircleSelected]}
              onPress={() => toggleDay(day.id)}
              activeOpacity={0.8}
            >
              <Text
                style={[styles.dayText, isSelected && styles.dayTextSelected]}
              >
                {day.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.quickSelectContainer}>
        <TouchableOpacity
          onPress={() => setDays([0, 1, 2, 3, 4, 5, 6])}
          style={styles.quickSelectButton}
          activeOpacity={0.8}
        >
          <Text style={styles.quickSelectText}>Todos los días</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setDays([1, 2, 3, 4, 5])}
          style={styles.quickSelectButton}
          activeOpacity={0.8}
        >
          <Text style={styles.quickSelectText}>Días hábiles</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setDays([0, 2, 4, 6])}
          style={styles.quickSelectButton}
          activeOpacity={0.8}
        >
          <Text style={styles.quickSelectText}>Días alternos</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.quickSelectContainer}>
        <TouchableOpacity
          onPress={() => setDays([])}
          style={styles.quickSelectButton}
          activeOpacity={0.8}
        >
          <Text style={styles.quickSelectText}>Limpiar días</Text>
        </TouchableOpacity>
      </View>

      {requiresHours && (
        <>
          <Text style={[styles.description, { marginTop: theme.spacing.xl }]}>
            ¿Cuánto tiempo podrán usar el celular al día?
          </Text>
          <View style={styles.hoursContainer}>
            {HOURS_RANGE.map((hour) => {
              const isSelected = hours === hour;
              return (
                <TouchableOpacity
                  key={hour}
                  style={[styles.hourBox, isSelected && styles.hourBoxSelected]}
                  onPress={() => setHours(hour)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.hourText,
                      isSelected && styles.hourTextSelected,
                    ]}
                  >
                    {hour + "h"}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: theme.textSizes.xl,
    fontWeight: theme.font.bold.toString(),
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  description: {
    fontSize: theme.textSizes.md,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.xl,
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  dayCircleSelected: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.primary,
  },
  dayText: {
    fontSize: theme.textSizes.md,
    color: theme.colors.textMuted,
    fontWeight: theme.font.semibold.toString(),
  },
  dayTextSelected: {
    color: theme.colors.primary,
  },
  quickSelectContainer: {
    flexDirection: "row",
    gap: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  quickSelectButton: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
  },
  quickSelectText: {
    fontSize: theme.textSizes.sm,
    color: theme.colors.textMuted,
    fontWeight: theme.font.semibold.toString(),
  },

  hoursContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.md,
  },
  hourBox: {
    width: "30%", // approx 3 items per row
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  hourBoxSelected: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.primary,
  },
  hourText: {
    fontSize: theme.textSizes.md,
    color: theme.colors.textMuted,
    fontWeight: theme.font.semibold.toString(),
  },
  hourTextSelected: {
    color: theme.colors.primary,
  },
});
