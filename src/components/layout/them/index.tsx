import { SunFilled, MoonFilled } from "@ant-design/icons";
import { useTheme } from "@/context/ThemContext";
import "./index.css";

export const ThemeSwitcher: React.FC = () => {
  const { Theme, toggleTheme } = useTheme();

  return (
    <div
      className="theme-switcher"
      onClick={toggleTheme}
      style={{
        backgroundColor: Theme ? "#141414" : "#ccc",
      }}
    >
      <div
        className="theme-switcher-icon"
        style={{
          left: Theme ? "30px" : "5px",
        }}
      >
        {Theme ? (
          <MoonFilled style={{ color: "#141414" }} />
        ) : (
          <SunFilled style={{ color: "#ffcc00" }} />
        )}
      </div>
    </div>
  );
};
