-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "email" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "configuration_keys" (
    "id" TEXT NOT NULL,
    "AuthorizationPkKey" TEXT,
    "listId" TEXT,
    "userId" TEXT,

    CONSTRAINT "configuration_keys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "configuration_keys_AuthorizationPkKey_key" ON "configuration_keys"("AuthorizationPkKey");

-- CreateIndex
CREATE UNIQUE INDEX "configuration_keys_userId_key" ON "configuration_keys"("userId");

-- AddForeignKey
ALTER TABLE "configuration_keys" ADD CONSTRAINT "configuration_keys_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
