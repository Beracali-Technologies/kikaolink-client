// src/hooks/usePollQr.ts
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

export function usePollQr(qrUrl: string | null, intervalMs = 1500, maxAttempts = 12) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(!!qrUrl);
  const [error, setError] = useState<string | null>(null);
  const attempts = useRef(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!qrUrl) return;

    const fetchOnce = async () => {
      try {
        const res = await axios.get(qrUrl);
        if (res.data && res.data.qr && res.data.qr.url) {
          setData(res.data);
          setLoading(false);
          if (timer.current) window.clearInterval(timer.current);
          return;
        }
      } catch (err: any) {
        // ignore 404/no-qr
      }

      attempts.current += 1;
      if (attempts.current >= maxAttempts) {
        setLoading(false);
        setError('QR generation is taking longer than expected. Try again later.');
        if (timer.current) window.clearInterval(timer.current);
      }
    };

    // start immediate, then interval
    fetchOnce();
    timer.current = window.setInterval(fetchOnce, intervalMs);

    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [qrUrl, intervalMs, maxAttempts]);

  return { data, loading, error };
}
