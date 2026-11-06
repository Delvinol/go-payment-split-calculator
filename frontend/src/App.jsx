
import { useEffect, useState } from "react";
import "./App.css";

//const API_URL = "http://localhost:8080/calculate";
//const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/calculate";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/calculate";

const installmentOptions = [6, 8, 12];

function App() {
  const [amount, setAmount] = useState("1200");
  const [installments, setInstallments] = useState(6);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Call Go backend automatically when amount or installments change
  useEffect(() => {
    const numericAmount = Number(amount);

    // Validate input before calling the API
    if (
      amount.trim() === "" ||
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0
    ) {
      setResult(null);
      setError("");
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    // Wait 400ms after the user stops typing
    const timeoutId = setTimeout(async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            askedamount: numericAmount,
            quotasnumber: installments,
          }),
          signal: controller.signal,
        });

        if (!response.ok) {
          const message = await response.text();
          throw new Error(message || "Calculation failed");
        }

        const data = await response.json();
        setResult(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Could not connect to the server");
          setResult(null);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 400);

    // Cancel previous request if the user changes the input again
    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [amount, installments]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const handleAmountChange = (event) => {
    const value = event.target.value;

    // Allow empty input and decimal numbers
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleSliderChange = (event) => {
    const index = Number(event.target.value);
    setInstallments(installmentOptions[index]);
  };

  const selectedIndex = installmentOptions.indexOf(installments);

  return (
    <main className="app-container">
      <section className="calculator-card">

        {/* Amount input */}
        <div className="amount-section">
          <label htmlFor="amount">How much do you need?</label>

          <div className="amount-input-wrapper">
            <span className="currency-symbol">S/</span>

            <input
              id="amount"
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
            />
          </div>
        </div>

        <div className="divider"></div>

        {/* Installment selection */}
        <div className="payment-section">
          <p className="section-label">Choose your payment plan</p>

          <div className="payment-header">
            <h2>{installments} payments</h2>

            <span className="monthly-amount">
              {result
                ? `S/ ${formatCurrency(result.normalquota)}/mo`
                : "--/mo"}
            </span>
          </div>

          {/* Slider */}
          <div className="slider-container">

            <div className="slider-labels">
              {installmentOptions.map((option) => (
                <span key={option}>{option}</span>
              ))}
            </div>

            <div className="slider-wrapper">

              <div className="slider-track">
                <div
                  className="slider-progress"
                  style={{
                    width: `${(selectedIndex / 2) * 100}%`,
                  }}
                />
              </div>

              <div className="slider-points">
                {installmentOptions.map((option, index) => (
                  <span
                    key={option}
                    className={`slider-point ${selectedIndex === index ? "active" : ""
                      }`}
                    style={{ left: `${index * 50}%` }}
                  />
                ))}
              </div>

              <input
                type="range"
                min="0"
                max="2"
                step="1"
                value={selectedIndex}
                onChange={handleSliderChange}
                className="payment-slider"
                aria-label="Number of payments"
              />

              <div
                className="slider-thumb"
                style={{
                  left: `${(selectedIndex / 2) * 100}%`,
                }}
              >
                <span>‹</span>
                <span>›</span>
              </div>
            </div>
          </div>
        </div>

        <div className="divider"></div>

        {/* Calculation results */}
        <div className="results-section">
          <div className="result-row">
            <span>Amount requested</span>
            <strong>
              S/ {formatCurrency(Number(amount) || 0)}
            </strong>
          </div>

          <div className="result-row">
            <span>Number of payments</span>
            <strong>{installments}</strong>
          </div>

          <div className="result-row">
            <span>Normal installment</span>
            <strong>
              {result
                ? `S/ ${formatCurrency(result.normalquota)}`
                : "--"}
            </strong>
          </div>

          <div className="result-row total-row">
            <span>Total to repay</span>
            <strong>
              {result
                ? `S/ ${formatCurrency(result.askedamount)}`
                : "--"}
            </strong>
          </div>
          <div className="result-row">
            <span>Normal installment</span>
            <strong>
              {result
                ? `S/ ${formatCurrency(result.normalquota)}`
                : "--"}
            </strong>
          </div>

          <div className="result-row">
            <span>Final installment</span>
            <strong>
              {result
                ? `S/ ${formatCurrency(result.finalquota)}`
                : "--"}
            </strong>
          </div>
        </div>

        {/* Loading and error messages */}
        {loading && (
          <p className="status-message">Calculating your payments...</p>
        )}

        {error && (
          <p className="error-message">{error}</p>
        )}

      </section>
    </main>
  );
}

export default App;
