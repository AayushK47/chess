"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "../globals.css";

const client = new QueryClient();

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <QueryClientProvider client={client}>
            <html lang="en">
                <body>{children}</body>
            </html>
        </QueryClientProvider>
    );
}
