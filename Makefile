composeDev = compose.dev.yaml

run-dev:
	docker compose -f $(composeDev) up --build

stop-dev:
	docker compose -f $(composeDev) down

restart-dev: stop-dev run-dev
