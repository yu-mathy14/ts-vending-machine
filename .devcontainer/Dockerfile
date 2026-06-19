## 開発環境のOS・ミドルウェア定義
# ベースとなるOSイメージを指定
# node:lts-slim -> Node.jsのLTS(長期サポート)版が入った軽量Linux
FROM node:lts-slim
# コンテナ内の作業ディレクトリを/workspaceに設定
# 以降のコマンドはこのディレクトリで実行される
WORKDIR /workspace

# DevContainerのイメージにGitを追加する
    # Linuxのパッケージ一覧を最新化
RUN apt-get update \
    # Gitをインストールする
    # -y -> Dockerビルド中は人が操作できないのでほぼ必須
    && apt-get install -y git \
    # 不要になったパッケージ一覧を削除
    # rm:削除(remove) -r:フォルダごと削除(recursive) -f:確認せず強制削除(force)
    && rm -rf /var/lib/apt/lists/*