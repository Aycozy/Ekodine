import os
import re

src_dir = 'PageMind/frontend/src'
# The regex was ('\.\./[^']+|../../[^']+) which requires characters after the slash.
# We just want to match ../lib/api or ../../lib/api exactly.
import_regex = re.compile(r"import\s+\{([^}]+)\}\s+from\s+'(\.\./lib/api|\.\./\.\./lib/api)';")

types = {'Book', 'Goal', 'BookNote', 'ReadingSession', 'ReadingStats', 'GrowthStats', 'HeatmapDay', 'AIInsight', 'JournalEntry', 'AIRecommendation', 'AIChatResponse'}

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            def replace_imports(match):
                imports = [x.strip() for x in match.group(1).split(',')]
                from_path = match.group(2)
                
                type_imports = [x for x in imports if x in types]
                value_imports = [x for x in imports if x not in types and x]
                
                result = []
                if value_imports:
                    result.append(f"import {{ {', '.join(value_imports)} }} from '{from_path}';")
                if type_imports:
                    result.append(f"import type {{ {', '.join(type_imports)} }} from '{from_path}';")
                
                return '\n'.join(result)
            
            new_content = import_regex.sub(replace_imports, content)
            
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
