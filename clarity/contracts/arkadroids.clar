(impl-trait .sip009-nft-trait.sip009-nft-trait)

(define-non-fungible-token arkadroids uint)

;; Constants
(define-constant contract-owner tx-sender)
(define-constant mint-limit u3)

(define-constant err-owner-only (err u100))
(define-constant err-not-token-owner (err u101))
(define-constant err-mint-limit-reached (err u102))
(define-constant err-invalid-user (err u103))
(define-constant err-metadata-frozen (err u111))

;; Internal variables
(define-data-var last-token-id uint u0)
(define-data-var curator-address principal 'SP2N3BAG4GBF8NHRPH6AY4YYH1SP6NK5TGCY7RDFA)
(define-data-var metadata-frozen bool false)
(define-data-var ipfs-root (string-ascii 80) "ipfs://QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn/")

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

(define-public (set-base-uri (new-base-uri (string-ascii 80)))
    (begin
        (asserts! (is-admin-user tx-sender) err-invalid-user)
        (asserts! (not (var-get metadata-frozen)) err-metadata-frozen)
        (var-set ipfs-root new-base-uri)
        (ok true)
    )
)

(define-public (set-curator-address (address principal))
    (begin
        (asserts! (is-admin-user tx-sender) err-invalid-user)
        (ok (var-set curator-address address))
    )
)

;; Private
(define-private (is-owner (token-id uint) (user principal))
    (is-eq user (unwrap! (nft-get-owner? arkadroids token-id) false)))

(define-private (is-admin-user (caller principal))
    (or (is-eq caller (var-get curator-address)) (is-eq caller contract-owner))
)
