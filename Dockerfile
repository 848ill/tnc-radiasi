# =============================================================================
# Stage 1: Build Go Binary
# =============================================================================
FROM golang:1.22-alpine AS builder

WORKDIR /app
COPY go.mod ./
COPY cmd/ ./cmd/

RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /app/tnc-server ./cmd/tnc-server

# =============================================================================
# Stage 2: Minimal Production Runtime
# =============================================================================
FROM alpine:3.20

RUN apk --no-cache add ca-certificates tzdata
ENV TZ=Asia/Jakarta

WORKDIR /app
COPY --from=builder /app/tnc-server /app/tnc-server
COPY web/ /app/web/
COPY assets/ /app/assets/
COPY data/ /app/data/

EXPOSE 8080
ENV PORT=8080

CMD ["/app/tnc-server"]
