def main():
    file_path = r"c:\Users\arjun\watchdesign-site\data\modules.js"
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Replace the broken unescaped single quotes
    content = content.replace("position: '3, 4, or 6 o'clock'", 'position: "3, 4, or 6 o\'clock"')
    content = content.replace("position: '3 o'clock (manual)'", 'position: "3 o\'clock (manual)"')

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Cleaned up unescaped single quotes!")

if __name__ == "__main__":
    main()
