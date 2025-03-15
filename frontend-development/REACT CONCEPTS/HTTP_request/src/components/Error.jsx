export default function Error({ title, message, onConfirm }) {
    return (
      <div className="error">
        <h2 style = {{textAlign: "center"}}>{title}</h2>
        <p style = {{textAlign: "center"}}>{message}</p>
        {onConfirm && (
          <div id="confirmation-actions">
            <button onClick={onConfirm} className="button">
              Okay
            </button>
          </div>
        )}
      </div>
    );
  }