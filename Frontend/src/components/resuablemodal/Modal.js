import "bootstrap/dist/css/bootstrap.min.css";
import "./Modal.css"; // for theme overrides

export default function Modal({ show, onClose, title, children }) {
  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={show ? { backgroundColor: "rgba(0,0,0,0.4)" } : {}}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content customModal">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="button" className="btn btn-primary"   onClick={onClose}>
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
