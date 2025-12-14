type TableProps = React.TableHTMLAttributes<HTMLTableElement>;

export function Table({ className, ...props }: TableProps) {
  return (
    <table
      {...props}
      className={`border-border text-foreground w-full border-collapse border ${
        className ?? ""
      }`}
    />
  );
}

type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>;

export function Tr({ className, ...props }: TableRowProps) {
  return <tr {...props} className={`border-border border-b ${className ?? ""}`} />;
}

type TableCellProps = React.ThHTMLAttributes<HTMLTableCellElement> &
  React.TdHTMLAttributes<HTMLTableCellElement>;

export function Th({ className, ...props }: TableCellProps) {
  return (
    <th
      {...props}
      className={`border-border border px-3 py-1 text-left font-semibold ${
        className ?? ""
      }`}
    />
  );
}

export function Td({ className, ...props }: TableCellProps) {
  return (
    <td
      {...props}
      className={`border-border border px-3 py-1 text-left ${className ?? ""}`}
    />
  );
}
