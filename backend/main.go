package main

import (
	"fmt"
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
	switch cal.QuotasNumber {
	case 6:
		//cal.QuotasNumber=5
		cal.NormalQuota = cal.AskedAmount / 6
		//cal.FinalQuota = cal.AskedAmount-(6*cal.NormalQuota)
	case 8:
		// cal.QuotasNumber=7
		cal.NormalQuota = cal.AskedAmount / 8
		// cal.FinalQuota = cal.AskedAmount-(8*cal.NormalQuota)
	case 12:
		// cal.QuotasNumber=11
		cal.NormalQuota = cal.AskedAmount / 12
		// cal.FinalQuota = cal.AskedAmount-(12*cal.NormalQuota)
	default:
		return fmt.Errorf("not valid amount: %s :(", cal.AskedAmount)
	}
	return nil
}

func calculateHandler(w http.ResponseWriter, r *http.Request) {
	//Only allow post
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed - use POST", http.StatusMethodNotAllowed)
		return
	}

}
