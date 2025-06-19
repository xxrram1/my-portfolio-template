import React, { useEffect } from 'react';
import { Command } from 'cmdk';
import { useTranslation } from 'react-i18next';
import { Home, User, Code, FolderGit, MessageSquare, Sun, Moon, Languages, Download } from 'lucide-react';

const CommandPalette = ({ open, setOpen, scrollToSection, handleThemeToggle, currentTheme }) => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prevOpen) => !prevOpen);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setOpen]);

  const runCommand = (command) => {
    command();
    setOpen(false);
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Kittisak_Phanngeam_Resume.pdf';
    link.download = 'Kittisak_Phanngeam_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Command.Dialog 
      open={open} 
      onOpenChange={setOpen} 
      label={t('command_palette.title')}
      // นี่คือส่วนที่เพิ่ม Style ทั้งหมด
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]"
    >
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div 
        className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-2xl"
      >
        <Command.Input 
          placeholder={t('command_palette.placeholder')} 
          className="w-full bg-transparent px-4 py-3 text-base text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none border-b border-slate-200 dark:border-slate-800"
        />
        <Command.List className="p-2 max-h-[400px] overflow-y-auto">
          <Command.Empty className="p-4 text-center text-sm text-slate-500">
            {t('command_palette.no_results')}
          </Command.Empty>

          <Command.Group heading={t('command_palette.navigation_group')} className="px-2 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Command.Item onSelect={() => runCommand(() => scrollToSection('hero'))} className="flex items-center p-2 rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 aria-selected:bg-indigo-500 aria-selected:text-white">
              <Home className="mr-3 h-4 w-4" />
              <span>{t('command_palette.go_to_home')}</span>
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => scrollToSection('about'))} className="flex items-center p-2 rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 aria-selected:bg-indigo-500 aria-selected:text-white">
              <User className="mr-3 h-4 w-4" />
              <span>{t('command_palette.go_to_profile')}</span>
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => scrollToSection('skills'))} className="flex items-center p-2 rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 aria-selected:bg-indigo-500 aria-selected:text-white">
              <Code className="mr-3 h-4 w-4" />
              <span>{t('command_palette.go_to_expertise')}</span>
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => scrollToSection('portfolio'))} className="flex items-center p-2 rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 aria-selected:bg-indigo-500 aria-selected:text-white">
              <FolderGit className="mr-3 h-4 w-4" />
              <span>{t('command_palette.go_to_projects')}</span>
            </Command.Item>
            <Command.Item onSelect={() => runCommand(() => scrollToSection('contact'))} className="flex items-center p-2 rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 aria-selected:bg-indigo-500 aria-selected:text-white">
              <MessageSquare className="mr-3 h-4 w-4" />
              <span>{t('command_palette.go_to_contact')}</span>
            </Command.Item>
          </Command.Group>

          <Command.Group heading={t('command_palette.actions_group')} className="px-2 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Command.Item onSelect={() => runCommand(handleThemeToggle)} className="flex items-center p-2 rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 aria-selected:bg-indigo-500 aria-selected:text-white">
              {currentTheme === 'dark' ? <Sun className="mr-3 h-4 w-4" /> : <Moon className="mr-3 h-4 w-4" />}
              <span>{currentTheme === 'dark' ? t('command_palette.switch_to_light') : t('command_palette.switch_to_dark')}</span>
            </Command.Item>
            <Command.Item onSelect={() => runCommand(handleDownloadResume)} className="flex items-center p-2 rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 aria-selected:bg-indigo-500 aria-selected:text-white">
              <Download className="mr-3 h-4 w-4" />
              <span>{t('command_palette.download_resume')}</span>
            </Command.Item>
          </Command.Group>

          <Command.Group heading={t('command_palette.language_group')} className="px-2 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
            {i18n.language !== 'en' && (
              <Command.Item onSelect={() => runCommand(() => i18n.changeLanguage('en'))} className="flex items-center p-2 rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 aria-selected:bg-indigo-500 aria-selected:text-white">
                <Languages className="mr-3 h-4 w-4" />
                <span>{t('command_palette.change_to_english')}</span>
              </Command.Item>
            )}
            {i18n.language !== 'th' && (
              <Command.Item onSelect={() => runCommand(() => i18n.changeLanguage('th'))} className="flex items-center p-2 rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 aria-selected:bg-indigo-500 aria-selected:text-white">
                <Languages className="mr-3 h-4 w-4" />
                <span>{t('command_palette.change_to_thai')}</span>
              </Command.Item>
            )}
            {i18n.language !== 'zh' && (
               <Command.Item onSelect={() => runCommand(() => i18n.changeLanguage('zh'))} className="flex items-center p-2 rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 aria-selected:bg-indigo-500 aria-selected:text-white">
                <Languages className="mr-3 h-4 w-4" />
                <span>{t('command_palette.change_to_chinese')}</span>
              </Command.Item>
            )}
          </Command.Group>
        </Command.List>
      </div>
    </Command.Dialog>
  );
};

export default CommandPalette;
