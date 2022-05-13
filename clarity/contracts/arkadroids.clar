(impl-trait .sip009-nft-trait.sip009-nft-trait)

(define-non-fungible-token arkadroids uint)

;; Constants
(define-constant contract-owner tx-sender)
(define-constant mint-limit u3)

(define-constant err-owner-only (err u100))
(define-constant err-not-token-owner (err u101))
(define-constant err-mint-limit-reached (err u102))

;; Internal variables
(define-data-var last-token-id uint u0)

;; Read-only
(define-read-only (get-last-token-id)
    (ok (var-get last-token-id))
)

(define-read-only (get-token-uri (token-id uint))
    (ok none)
)

(define-read-only (get-owner (token-id uint))
    (ok (nft-get-owner? arkadroids token-id))
)

;; Public
(define-public (transfer (token-id uint) (sender principal) (recipient principal))
    (begin
        (asserts! (is-eq tx-sender sender) err-not-token-owner)
        (nft-transfer? arkadroids token-id sender recipient)
    )
)

(define-public (mint (recipient principal))
    (let
        (
            (token-id (+ (var-get last-token-id) u1))
        )
        (asserts! (is-eq tx-sender contract-owner) err-owner-only)
        (asserts! (<= token-id mint-limit) err-mint-limit-reached)
        (try! (nft-mint? arkadroids token-id recipient))
        (var-set last-token-id token-id)
        (ok token-id)
    )
)

;; Private