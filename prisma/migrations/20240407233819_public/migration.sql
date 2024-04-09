-- CreateTable
CREATE TABLE "accounts" (
    "userid" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "encryptedpassword" VARCHAR(60) NOT NULL,
    "createdat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("userid")
);

-- CreateTable
CREATE TABLE "discoveryqueue" (
    "queueid" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "movieid" INTEGER NOT NULL,
    "ranking" INTEGER NOT NULL,
    "updatedate" DATE,

    CONSTRAINT "discoveryqueue_pkey" PRIMARY KEY ("queueid")
);

-- CreateTable
CREATE TABLE "favouritemovies" (
    "favouriteid" SERIAL NOT NULL,
    "userid" INTEGER,
    "movieid" INTEGER NOT NULL,

    CONSTRAINT "favouritemovies_pkey" PRIMARY KEY ("favouriteid")
);

-- CreateTable
CREATE TABLE "likedmovies" (
    "likeid" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "movieid" INTEGER NOT NULL,

    CONSTRAINT "likedmovies_pkey" PRIMARY KEY ("likeid")
);

-- CreateTable
CREATE TABLE "UserPlaylist" (
    "playlistid" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "playlist_name" VARCHAR(255) NOT NULL,
    "playlist_desc" VARCHAR(255),

    CONSTRAINT "UserPlaylist_pkey" PRIMARY KEY ("playlistid")
);

-- CreateTable
CREATE TABLE "PlaylistMovies" (
    "id" SERIAL NOT NULL,
    "playlistid" INTEGER NOT NULL,
    "movieid" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "PlaylistMovies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userpreferences" (
    "userid" INTEGER NOT NULL,
    "preferredgenre" VARCHAR(50),

    CONSTRAINT "userpreferences_pkey" PRIMARY KEY ("userid")
);

-- CreateTable
CREATE TABLE "watchhistory" (
    "watchid" SERIAL NOT NULL,
    "userid" INTEGER,
    "movieid" INTEGER NOT NULL,
    "watchedat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "watchhistory_pkey" PRIMARY KEY ("watchid")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_username_key" ON "accounts"("username");

-- CreateIndex
CREATE UNIQUE INDEX "discoveryqueue_userid_movieid_key" ON "discoveryqueue"("userid", "movieid");

-- CreateIndex
CREATE UNIQUE INDEX "favouritemovies_userid_movieid_key" ON "favouritemovies"("userid", "movieid");

-- CreateIndex
CREATE UNIQUE INDEX "likedmovies_userid_movieid_key" ON "likedmovies"("userid", "movieid");

-- CreateIndex
CREATE UNIQUE INDEX "UserPlaylist_userid_playlistid_key" ON "UserPlaylist"("userid", "playlistid");

-- CreateIndex
CREATE UNIQUE INDEX "PlaylistMovies_playlistid_movieid_key" ON "PlaylistMovies"("playlistid", "movieid");

-- CreateIndex
CREATE UNIQUE INDEX "PlaylistMovies_playlistid_position_key" ON "PlaylistMovies"("playlistid", "position");

-- CreateIndex
CREATE UNIQUE INDEX "watchhistory_userid_movieid_key" ON "watchhistory"("userid", "movieid");

-- AddForeignKey
ALTER TABLE "discoveryqueue" ADD CONSTRAINT "discoveryqueue_userid_fkey" FOREIGN KEY ("userid") REFERENCES "accounts"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "favouritemovies" ADD CONSTRAINT "favouritemovies_userid_fkey" FOREIGN KEY ("userid") REFERENCES "accounts"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "likedmovies" ADD CONSTRAINT "likedmovies_userid_fkey" FOREIGN KEY ("userid") REFERENCES "accounts"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserPlaylist" ADD CONSTRAINT "UserPlaylist_userid_fkey" FOREIGN KEY ("userid") REFERENCES "accounts"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistMovies" ADD CONSTRAINT "PlaylistMovies_playlistid_fkey" FOREIGN KEY ("playlistid") REFERENCES "UserPlaylist"("playlistid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userpreferences" ADD CONSTRAINT "userpreferences_userid_fkey" FOREIGN KEY ("userid") REFERENCES "accounts"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "watchhistory" ADD CONSTRAINT "watchhistory_userid_fkey" FOREIGN KEY ("userid") REFERENCES "accounts"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION;
