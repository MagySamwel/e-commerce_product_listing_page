"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

export type FiltersState = {
    size?: string[];
    min_price?: string[];
    max_price?: string[];
    min_rating?: string | undefined;
    sort_by?: string | undefined;
    sort_order?: string | undefined;
};

/**
 * Hook for managing product filters.
 * Supports both immediate application (desktop) and pending state (mobile).
 */
export function useProductFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [pendingFilters, setPendingFilters] = useState<FiltersState>({});

    // Get current filter values from URL
    const currentFilters: FiltersState = useMemo(() => {
        const sizes = searchParams.getAll("size");
        const minPrices = searchParams.getAll("min_price");
        const maxPrices = searchParams.getAll("max_price");
        const rating = searchParams.get("min_rating") || undefined;
        const sort_by = searchParams.get("sort_by") || undefined;
        const sort_order = searchParams.get("sort_order") || undefined;

        return {
            size: sizes.length ? sizes : undefined,
            min_price: minPrices.length ? minPrices : undefined,
            max_price: maxPrices.length ? maxPrices : undefined,
            min_rating: rating,
            sort_by: sort_by,
            sort_order: sort_order,
        };
    }, [searchParams]);

    // Count active filters for display
    const activeFiltersCount = useMemo(() => {
        let count = 0;

        if (currentFilters.size) count += currentFilters.size.length;
        if (currentFilters.min_price) count += currentFilters.min_price.length;
        if (currentFilters.min_rating) count += 1;
        if (searchParams.get("brand")) count += 1;
        if (currentFilters.sort_by) count += 1;

        return count;
    }, [currentFilters, searchParams]);

    // Build URL with filter updates
    const buildUrl = useCallback((updates: FiltersState) => {
        const params = new URLSearchParams(searchParams.toString());

        // Clear existing filter params
        params.delete("size");
        params.delete("min_price");
        params.delete("max_price");
        params.delete("min_rating");
        params.delete("sort_by");
        params.delete("sort_order");

        // Apply new filter values
        updates.size?.forEach((s) => params.append("size", s));

        if (updates.min_price || updates.max_price) {
            const mins = updates.min_price || [];
            const maxs = updates.max_price || [];
            const len = Math.max(mins.length, maxs.length);

            for (let i = 0; i < len; i++) {
                params.append("min_price", mins[i] ?? "");
                params.append("max_price", maxs[i] ?? "");
            }
        }

        if (updates.min_rating) {
            params.set("min_rating", updates.min_rating);
        }

        if (updates.sort_by) {
            params.set("sort_by", updates.sort_by);
        }
        if (updates.sort_order) {
            params.set("sort_order", updates.sort_order);
        }

        const queryString = params.toString();
        return `/products${queryString ? `?${queryString}` : ""}`;
    }, [searchParams]);

    // Apply filters immediately (desktop behavior)
    const applyFiltersDirect = useCallback(
        (newFilters: FiltersState) => {
            router.push(buildUrl(newFilters));
        },
        [router, buildUrl]
    );

    // Toggle size filter
    const toggleSize = useCallback((size: string) => {
        const current = currentFilters.size || [];
        const exists = current.includes(size);

        const next = exists
            ? current.filter((s) => s !== size)
            : [...current, size];

        applyFiltersDirect({ ...currentFilters, size: next.length ? next : undefined });
    }, [currentFilters, applyFiltersDirect]);

    // Toggle price range filter
    const togglePriceRange = useCallback((min: number, max: number | undefined) => {
        const mins = [...(currentFilters.min_price || [])];
        const maxs = [...(currentFilters.max_price || [])];

        const minStr = String(min);
        const maxStr = max !== undefined ? String(max) : "";

        const index = mins.findIndex(
            (m, i) => m === minStr && maxs[i] === maxStr
        );

        if (index !== -1) {
            mins.splice(index, 1);
            maxs.splice(index, 1);
        } else {
            mins.push(minStr);
            maxs.push(maxStr);
        }

        applyFiltersDirect({
            ...currentFilters,
            min_price: mins.length ? mins : undefined,
            max_price: maxs.length ? maxs : undefined,
        });
    }, [currentFilters, applyFiltersDirect]);

    // Set rating filter
    const setRating = useCallback((value: number | undefined) => {
        applyFiltersDirect({
            ...currentFilters,
            min_rating: value !== undefined ? String(value) : undefined,
        });
    }, [currentFilters, applyFiltersDirect]);

    // Clear all filters
    const clearAll = useCallback(() => {
        router.push("/");
    }, [router]);

    // ========== (for mobile) ==========
    
    /**
     * Initialize pending filters from current URL filters.
     * Call this when opening the mobile modal.
     */
    const initializePendingFilters = useCallback(() => {
        setPendingFilters(currentFilters);
    }, [currentFilters]);

    /**
     * Update a pending filter value.
     */
    const setPending = useCallback((key: keyof FiltersState, value: FiltersState[keyof FiltersState]) => {
        setPendingFilters((prev) => ({ ...prev, [key]: value }));
    }, []);

    /**
     * Reset pending filters to empty state.
     */
    const resetPending = useCallback(() => {
        setPendingFilters({});
    }, []);

    /**
     * Apply pending filters to URL and clear pending state.
     */
    const applyPending = useCallback(() => {
        if (Object.keys(pendingFilters).length === 0) return;
        router.push(buildUrl(pendingFilters));
        setPendingFilters({});
    }, [pendingFilters, buildUrl, router]);

    /**
     * Get current value (pending or URL fallback).
     * For single values (not arrays).
     */
    const getCurrentValue = useCallback((key: keyof FiltersState): string | undefined => {
        if (pendingFilters[key] !== undefined) {
            const value = pendingFilters[key];
            return Array.isArray(value) ? undefined : (value as string | undefined);
        }
        return currentFilters[key] as string | undefined;
    }, [pendingFilters, currentFilters]);

    /**
     * Get selected prices as a Set for easy lookup.
     * Uses pending filters if available, otherwise falls back to URL.
     */
    const getSelectedPrices = useCallback((): Set<string> => {
        const prices = new Set<string>();
        const mins = pendingFilters.min_price ?? currentFilters.min_price ?? [];
        const maxs = pendingFilters.max_price ?? currentFilters.max_price ?? [];

        for (let i = 0; i < Math.max(mins.length, maxs.length); i++) {
            const min = Number(mins[i] || 0);
            const max = maxs[i] ? Number(maxs[i]) : undefined;
            const priceKey = `${min}-${max ?? 'inf'}`;
            prices.add(priceKey);
        }

        return prices;
    }, [pendingFilters, currentFilters]);

    /**
     * Get selected sizes as a Set.
     * Uses pending filters if available, otherwise falls back to URL.
     */
    const getSelectedSizes = useCallback((): Set<string> => {
        const sizes = pendingFilters.size ?? currentFilters.size ?? [];
        return new Set(sizes);
    }, [pendingFilters, currentFilters]);

    /**
     * Toggle price range in pending filters (for mobile).
     */
    const togglePriceRangePending = useCallback((min: number, max: number | undefined) => {
        const selectedPrices = getSelectedPrices();
        const priceKey = `${min}-${max ?? 'inf'}`;
        const isSelected = selectedPrices.has(priceKey);

        const currentMins = pendingFilters.min_price ?? currentFilters.min_price ?? [];
        const currentMaxs = pendingFilters.max_price ?? currentFilters.max_price ?? [];

        if (isSelected) {
            const newMins: string[] = [];
            const newMaxs: string[] = [];

            for (let i = 0; i < currentMins.length; i++) {
                const existingKey = `${Number(currentMins[i])}-${currentMaxs[i] ? Number(currentMaxs[i]) : 'inf'}`;
                if (existingKey !== priceKey) {
                    newMins.push(currentMins[i]);
                    newMaxs.push(currentMaxs[i] || "");
                }
            }

            setPending("min_price", newMins.length ? newMins : undefined);
            setPending("max_price", newMaxs.length ? newMaxs : undefined);
        } else {
            // Add the price range
            const newMins = [...currentMins, String(min)];
            const newMaxs = [...currentMaxs, max !== undefined ? String(max) : ""];
            setPending("min_price", newMins);
            setPending("max_price", newMaxs);
        }
    }, [pendingFilters, currentFilters, getSelectedPrices, setPending]);

    /**
     * Toggle size in pending filters (for mobile).
     */
    const toggleSizePending = useCallback((size: string) => {
        const currentSizes = pendingFilters.size ?? currentFilters.size ?? [];
        const isSelected = currentSizes.includes(size);

        const newSizes = isSelected
            ? currentSizes.filter((s) => s !== size)
            : [...currentSizes, size];

        setPending("size", newSizes.length ? newSizes : undefined);
    }, [pendingFilters, currentFilters, setPending]);

    /**
     * Set rating in pending filters (for mobile).
     */
    const setRatingPending = useCallback((value: number | undefined) => {
        setPending("min_rating", value !== undefined ? String(value) : undefined);
    }, [setPending]);

    /**
     * Set sort in pending filters (for mobile).
     */
    const setSortPending = useCallback((sortBy: string | undefined, sortOrder: string | undefined) => {
        setPending("sort_by", sortBy);
        setPending("sort_order", sortOrder);
    }, [setPending]);

    return {
        // Desktop
        currentFilters,
        activeFiltersCount,
        toggleSize,
        togglePriceRange,
        setRating,
        clearAll,

        // Mobile
        pendingFilters,
        initializePendingFilters,
        setPending,
        resetPending,
        applyPending,
        getCurrentValue,
        getSelectedPrices,
        getSelectedSizes,
        togglePriceRangePending,
        toggleSizePending,
        setRatingPending,
        setSortPending,
    };
}
