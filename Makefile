# 这些目标被声明为伪目标，确保 make 不会将其与同名文件混淆。
.PHONY: dist test
# 直接运行 make，会执行 default 目标，因为这是文件中的第一个目标 从而执行 help指令
default: help

install:
	npm install --registry=http://registry.npm.taobao.org

dist: install-cn
	npm run dist

dev:
	npm run dev

help:
	@echo "   \033[35mmake\033[0m \033[1m命令使用说明\033[0m"
