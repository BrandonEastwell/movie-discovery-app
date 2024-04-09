/*
  Warnings:

  - You are about to drop the `PlaylistMovies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserPlaylist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlaylistMovies" DROP CONSTRAINT "PlaylistMovies_playlistid_fkey";

-- DropForeignKey
ALTER TABLE "UserPlaylist" DROP CONSTRAINT "UserPlaylist_userid_fkey";

-- DropTable
DROP TABLE "PlaylistMovies";

-- DropTable
DROP TABLE "UserPlaylist";

-- CreateTable
CREATE TABLE "userplaylist" (
    "playlistid" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "playlist_name" VARCHAR(255) NOT NULL,
    "playlist_desc" VARCHAR(255),

    CONSTRAINT "userplaylist_pkey" PRIMARY KEY ("playlistid")
);

-- CreateTable
CREATE TABLE "playlistmovies" (
    "id" SERIAL NOT NULL,
    "playlistid" INTEGER NOT NULL,
    "movieid" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "playlistmovies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userplaylist_userid_playlistid_key" ON "userplaylist"("userid", "playlistid");

-- CreateIndex
CREATE UNIQUE INDEX "playlistmovies_playlistid_movieid_key" ON "playlistmovies"("playlistid", "movieid");

-- CreateIndex
CREATE UNIQUE INDEX "playlistmovies_playlistid_position_key" ON "playlistmovies"("playlistid", "position");

-- AddForeignKey
ALTER TABLE "userplaylist" ADD CONSTRAINT "userplaylist_userid_fkey" FOREIGN KEY ("userid") REFERENCES "accounts"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "playlistmovies" ADD CONSTRAINT "playlistmovies_playlistid_fkey" FOREIGN KEY ("playlistid") REFERENCES "userplaylist"("playlistid") ON DELETE RESTRICT ON UPDATE CASCADE;
