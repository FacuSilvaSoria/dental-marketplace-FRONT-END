const Button = ({ text, onClick }) => {
  return (
    <button style={styles.button} onClick={onClick}>
      {text}
    </button>
  );
};

const styles = {
  button: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #22c55e, #06b6d4)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default Button;