import React, { useState } from "react";

const SwitchValue = () => {
    const [onToogle, setOnToogle] = useState(false);
    return (
        <span className="form-check form-switch">
            <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckChecked"
                onChange={(event) => setOnToogle(event.target.checked)}
            />
            <span>{onToogle ? "on" : "off"}</span>
        </span>
    );
};

export default SwitchValue;
