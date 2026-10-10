import React, { createContext, useContext, useMemo } from 'react';
import {
  UserIntentId,
  ExperienceLevelId,
  UserIntentState,
  IntentContextType,
} from '@/types/intent';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const INTENT_STORAGE_KEY = 'groww_compass_user_intent';

const defaultIntentState: UserIntentState = {
  intent: 'understand-stocks',
  experienceLevel: 'beginner',
  hasCompletedIntent: false,
};

const IntentContext = createContext<IntentContextType | undefined>(undefined);

export const IntentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [storedState, setStoredState, removeStoredState] = useLocalStorage<UserIntentState>(
    INTENT_STORAGE_KEY,
    defaultIntentState
  );

  const setIntent = (newIntent: UserIntentId) => {
    setStoredState((prev) => ({
      ...prev,
      intent: newIntent,
    }));
  };

  const setExperienceLevel = (newLevel: ExperienceLevelId) => {
    setStoredState((prev) => ({
      ...prev,
      experienceLevel: newLevel,
    }));
  };

  const completeIntent = () => {
    setStoredState((prev) => ({
      ...prev,
      hasCompletedIntent: true,
    }));
  };

  const resetIntent = () => {
    removeStoredState();
  };

  const value = useMemo(
    () => ({
      intent: storedState.intent,
      experienceLevel: storedState.experienceLevel,
      hasCompletedIntent: storedState.hasCompletedIntent,
      setIntent,
      setExperienceLevel,
      completeIntent,
      resetIntent,
    }),
    [storedState]
  );

  return <IntentContext.Provider value={value}>{children}</IntentContext.Provider>;
};

export const useIntent = (): IntentContextType => {
  const context = useContext(IntentContext);
  if (!context) {
    throw new Error('useIntent must be used within an IntentProvider');
  }
  return context;
};
