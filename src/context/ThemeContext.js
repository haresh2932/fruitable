import { createContext, useReducer } from "react";
import React from 'react';
import { TOGGLE_THEME } from "./ActionType";
import { themeReducer } from "./reducer/context.reducer";

const initialState = {
    theme: "light",
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(themeReducer, initialState);

    const toggleTheme = () => {
        const newTheme = state.theme === "light" ? "dark" : "light";

        dispatch({ type: TOGGLE_THEME, payload: newTheme });
    };

    return (
        <ThemeContext.Provider
            value={{
                ...state,
                toggleTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
