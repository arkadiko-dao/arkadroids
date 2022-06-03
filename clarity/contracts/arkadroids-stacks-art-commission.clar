(impl-trait .commission-trait.commission)

(define-public (pay (id uint) (price uint))
  (begin
    (try! (stx-transfer? (/ (* price u25) u1000) tx-sender 'SP2N3BAG4GBF8NHRPH6AY4YYH1SP6NK5TGCY7RDFA))
    (try! (stx-transfer? (/ (* price u50) u1000) tx-sender 'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR))
    (ok true)
  )
)