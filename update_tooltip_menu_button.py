#!/usr/bin/env python3
import json
import os

# Dictionary of translations for "User Profile Button" in different languages
translations = {
    'ar.json': 'زر الملف الشخصي للمستخدم - انقر علي! 📋',
    'bn.json': 'ব্যবহারকারী প্রোফাইল বোতাম - আমাকে ক্লিক করুন! 📋',
    'hi.json': 'उपयोगकर्ता प्रोफ़ाइल बटन - मुझे क्लिक करें! 📋',
    'ja.json': 'ユーザープロフィールボタン - クリックしてください！📋',
    'ko.json': '사용자 프로필 버튼 - 클릭하세요! 📋',
    'pa.json': 'ਯੂਜ਼ਰ ਪ੍ਰੋਫਾਈਲ ਬਟਨ - ਮੈਨੂੰ ਕਲਿਕ ਕਰੋ! 📋',
    'pt.json': 'Botão Perfil do Usuário - Clique em mim! 📋',
    'ru.json': 'Кнопка Профиль Пользователя - Нажмите на меня! 📋',
    'tr.json': 'Kullanıcı Profili Düğmesi - Bana tıklayın! 📋',
    'uk.json': 'Кнопка Профіль Користувача - Натисніть мене! 📋',
    'zh.json': '用户配置文件按钮 - 点击我！📋'
}

# Path to the language files
lang_dir = 'neuro-core/neuro_core/config/langs'

def update_language_file(filename):
    filepath = os.path.join(lang_dir, filename)
    
    if not os.path.exists(filepath):
        print(f"File {filepath} not found, skipping...")
        return
    
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Update both instances of tooltip_menu_button
    updated = False
    
    # First instance (in neurobase_main_window section)
    if 'neurobase_main_window' in data:
        if 'tooltip_menu_button' in data['neurobase_main_window']:
            data['neurobase_main_window']['tooltip_menu_button'] = translations[filename]
            updated = True
    
    # Second instance (in neurocore_main_window section)
    if 'neurocore_main_window' in data:
        if 'tooltip_menu_button' in data['neurocore_main_window']:
            data['neurocore_main_window']['tooltip_menu_button'] = translations[filename]
            updated = True
    
    if updated:
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"Updated {filename}")
    else:
        print(f"No tooltip_menu_button found in {filename}")

def main():
    print("Updating tooltip_menu_button translations...")
    
    for filename in translations.keys():
        update_language_file(filename)
    
    print("Done!")

if __name__ == "__main__":
    main()
