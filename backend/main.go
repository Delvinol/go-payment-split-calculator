package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math"
	"net/http"
)

// this will auto calcumaent the amount lended
// quotas number: 6 8 12
// normal cuota can be different from final cuota that why final cuota was created
type Calculation struct {
	AskedAmount  float64 `json:"askedamount"`
	QuotasNumber int     `json:"quotasnumber"`
	NormalQuota  float64 `json:"normalquota"`
	FinalQuota   float64 `json:"finalquota"`
}

func (cal *Calculation) Calculate() error {
	if cal.AskedAmount <= 0 {
		return fmt.Errorf("Amount should be positive or greater than 0")
	}
	switch cal.QuotasNumber {
	//TRYING TO CLEAN THE CODE
	case 6, 8, 12:
		// Round regular installments to two decimal places.
		cal.NormalQuota = math.Round((cal.AskedAmount/float64(cal.QuotasNumber))*100) / 100

		// Adjust the final installment to preserve the exact total.
		cal.FinalQuota = math.Round(
			(cal.AskedAmount-cal.NormalQuota*float64(cal.QuotasNumber-1))*100,
		) / 100
	// switch cal.QuotasNumber {
	// case 6:
	// 	//cal.QuotasNumber=5
	// 	cal.NormalQuota = cal.AskedAmount / 6
	// 	//cal.FinalQuota = cal.AskedAmount-(6*cal.NormalQuota)
	// case 8:
	// 	// cal.QuotasNumber=7
	// 	cal.NormalQuota = cal.AskedAmount / 8
	// 	// cal.FinalQuota = cal.AskedAmount-(8*cal.NormalQuota)
	// case 12:
	// 	// cal.QuotasNumber=11
	// 	cal.NormalQuota = cal.AskedAmount / 12
	// 	// cal.FinalQuota = cal.AskedAmount-(12*cal.NormalQuota)
	default:
		return fmt.Errorf("not valid amount: %d :(", cal.AskedAmount)
	}
	return nil
}

func calculateHandler(w http.ResponseWriter, r *http.Request) {
	// CORS configuration
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	//Only allow post
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed - use POST", http.StatusMethodNotAllowed)
		return
	}

	//Decode JSON
	var cal Calculation
	dec := json.NewDecoder(r.Body)
	if err := dec.Decode(&cal); err != nil {
		http.Error(w, "Error reading JSON: "+err.Error(), http.StatusBadRequest)
		return
	}

	//Execute calculation
	if err := cal.Calculate(); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	//Answering with JSON
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(cal); err != nil {
		http.Error(w, "Error building an answer: ("+err.Error(), http.StatusInternalServerError)
		return
	}
}

func main() {
	const port = ":8080"
	http.HandleFunc("/calculate", calculateHandler)
	fmt.Printf("Server initialized in http://localhost%s\n", port)
	log.Fatal(http.ListenAndServe(port, nil))
}
