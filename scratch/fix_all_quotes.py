def main():
    file_path = r"c:\Users\arjun\watchdesign-site\data\modules.js"
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Let's fix specific known apostrophe issues in our new slide definitions
    content = content.replace("symptom: 'Crown won't seat flush or snaps movement pillar.'", 'symptom: "Crown won\'t seat flush or snaps movement pillar."')
    content = content.replace("features: 'Ultra-slim profile, high-beat seconds sweep. Best entry-level caliber.'", 'features: "Ultra-slim profile, high-beat seconds sweep. Best entry-level caliber."')
    content = content.replace("position: '3 o'clock (manual)'", 'position: "3 o\'clock (manual)"')

    # Let's make sure there are no other accidental unescaped single quotes in the newly added structured attributes
    # We will search for any key: 'value' where value has a single quote
    # E.g. features: '... don't ...'
    # We can replace single quotes on properties containing contractions:
    content = content.replace("symptom: 'Crown won't seat flush", "symptom: \"Crown won't seat flush")
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
        
    print("Apostrophes corrected successfully!")

if __name__ == "__main__":
    main()
